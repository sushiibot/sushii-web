export default class UserLevelProgress {
  level: number;

  nextLevelXpRequired: number;

  nextLevelXpProgress: number;

  nextLevelXpPercentage: number;

  constructor(xp: number) {
    if (Number.isNaN(xp)) {
      throw new Error("xp is NaN");
    }

    if (xp > Number.MAX_SAFE_INTEGER) {
      throw new Error("xp is too big");
    }

    const level = UserLevelProgress.getLevel(xp);

    // Total amount of XP to get to current level
    const currLevelTotalXp = UserLevelProgress.nextLevel(level);
    // Total amount of XP to get to next level
    const nextLevelTotalXp = UserLevelProgress.nextLevel(level + 1);

    // How much total XP needed to get from current level to next
    const nextLevelXpRequired = nextLevelTotalXp - currLevelTotalXp;
    // How much XP needed left considering current XP
    const nextLevelXpRemaining = nextLevelTotalXp - xp;
    // How much XP gained only in current level
    const nextLevelXpProgress = nextLevelXpRequired - nextLevelXpRemaining;

    const nextLevelXpPercentage =
      (nextLevelXpProgress / nextLevelXpRequired) * 100.0;

    this.level = level;
    this.nextLevelXpRequired = nextLevelXpRequired;
    this.nextLevelXpProgress = nextLevelXpProgress;
    this.nextLevelXpPercentage = nextLevelXpPercentage;
  }

  static nextLevel(level: number): number {
    return 50 * level ** 2 - 50 * level;
  }

  static getLevel(xp: number): number {
    let level = 0;
    while (UserLevelProgress.nextLevel(level + 1) <= xp) {
      level += 1;
    }

    return level;
  }
}
