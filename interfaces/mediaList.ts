export interface mediaList {
  cover?: mediaScrap,
  imgs: Array<mediaScrap>,
  videos:Array<mediaScrap>
}

export interface mediaScrap {
  link: string
  title?:string,
  type: string
  source?:string
  preview?:string
}