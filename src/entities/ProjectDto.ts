export interface ProjectDto {
  id: number;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  city: {
    id: number;
    arName: string;
    enName: string;
  };
  country: {
    id: number;
    arName: string;
    enName: string;
  };
  tags?: Tag[];
}

export interface Tag {
  id: number;
  arTitle: string;
  enTitle: string;
}
