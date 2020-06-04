export interface IStatisticsService {
  FetchUserStatistics(req: any, res: any): void;
  FetchStatisticsByDate(req: any, res: any): void;
  FetchGoldenSpoonProgress(req: any, res: any): void;
  FetchCategoriesStatistics(req: any, res: any): void;
}
