export interface IActionReq {
    date: string,
    name: string,
    description: string,
    shortDescription: string,
    imagePath: string,
    forCarousel: boolean,
    forActions: boolean
}

export interface IAction extends IActionReq{
    id: string
}