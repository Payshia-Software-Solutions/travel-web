export interface DayPlan {
  dayId: number;
  dayTitle: string;
  dayPlan: string;
}

export interface Tour {
  _id: string;
  tourId:string;
  highlightText: string;
  tourName: string;
  tourDetails: string;
  tourGallery: string[];
  participants: number;
  tourPrice: number;
  aboutThisTour: string;
  noOfDays: number;
  tourSchedule: DayPlan[];
  tourCover: string;
  aboutCover: string;
  tags: string;
  basePlace: string;
  tourCategory:string;
  isActive:number;
}
