export interface Stats {
  user: {
    id: number;
    athlete: {
      id: number;
      firstname: string;
      lastname: string;
    };
    run_total_kilometers: number;
    run_total_miles: number;
    ytd_run_total_kilometers: number;
    ytd_run_total_miles: number;
  };
}

export type AllStats = Stats[];
