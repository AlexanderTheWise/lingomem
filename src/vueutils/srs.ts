import type { Evalutation, SRItem } from "@/types";

export function calculateNextReview(currentTime: number, interval: number) {
  const intervalInMiliseconds = interval * 24 * 60 * 60 * 1000;
  return currentTime + intervalInMiliseconds;
}

export function calculateLateness(currentTime: number, scheduledTime: number) {
  const timeDifferenceInHours =
    (currentTime - scheduledTime) / (60 * 60 * 1000);

  return timeDifferenceInHours / 24;
}

export function srsFunc(previous: SRItem, evaluation: Evalutation) {
  let reviews: number, efactor: number, interval: number;

  const daysFromMinutes = (min: number) => {
    return min / (24.0 * 60.0);
  };

  if (previous.reviews <= 2) {
    efactor = previous.efactor;

    if (evaluation.score < 3) {
      reviews = 0;

      interval = 1.0 / (24.0 * 60.0);
    } else if (evaluation.score < 5) {
      reviews = previous.reviews + 1;

      if (reviews == 1) {
        interval = daysFromMinutes(1);
      } else if (reviews == 2) {
        interval = daysFromMinutes(10);
      } else {
        interval = 1.0;
      }
    } else {
      reviews = previous.reviews + 1;
      interval = 4.0;
    }
  } else {
    if (evaluation.score < 3) {
      reviews = 0;
      interval = daysFromMinutes(1);

      efactor = Math.max(1.3, previous.efactor - 0.2);
    } else {
      const latenessDays = Math.max(0, evaluation.lateness * previous.interval);
      let latenessBonus = 0.0;
      if (latenessDays > 0) {
        if (evaluation.score >= 5) {
          latenessBonus = latenessDays;
        } else if (evaluation.score >= 4) {
          latenessBonus = latenessDays / 2.0;
        } else {
          latenessBonus = latenessDays / 4.0;
        }
      }
      efactor = Math.max(
        1.3,
        previous.efactor +
          (0.1 -
            (5 - evaluation.score) * (0.08 + (5 - evaluation.score) * 0.02)),
      );

      reviews = previous.reviews + 1;

      let workingEfactor = efactor;
      if (evaluation.score >= 3.0 && evaluation.score < 4) {
        interval = Math.ceil(previous.interval * 1.2);

        workingEfactor = Math.max(1.3, workingEfactor - 0.15);
      } else if (evaluation.score >= 5.0) {
        workingEfactor = Math.max(1.3, workingEfactor + 0.15);
      }

      interval = Math.ceil(
        (previous.interval + latenessBonus) * workingEfactor,
      );

      const fuzzForInterval = (interval: number) => {
        let fuzzRange;
        if (interval < 2) {
          fuzzRange = 0;
        } else if (interval == 2) {
          fuzzRange = 1;
        } else if (interval < 7) {
          fuzzRange = Math.round(interval * 0.25);
        } else if (interval < 30) {
          fuzzRange = Math.max(2, Math.round(interval * 0.25));
        } else {
          fuzzRange = Math.max(4, Math.round(interval * 0.05));
        }

        return Math.random() * fuzzRange - fuzzRange * 0.5;
      };

      interval += fuzzForInterval(interval);
    }
  }

  return { reviews, efactor, interval };
}
