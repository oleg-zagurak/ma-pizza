export interface IVacancyReq{
    title: string,
    description: string,
    imagePath: string
}

export interface IVacancy extends IVacancyReq{
    id: string
}
