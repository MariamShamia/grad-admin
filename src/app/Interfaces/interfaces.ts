
  export interface Statistics {
    agree: number;
    neutral: number;
    disagree: number;
    title: string;
  }
  export interface SideBarRow {
    icon: string;
    label: string;
  }
  
  export interface Message {
    severity: string;
    summary: string;
    detail: string;
  }