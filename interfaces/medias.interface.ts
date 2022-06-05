export default interface Media {
  id: number;
  title: string;
  type: "image" | "video" | "sound";
  link: string;
  data: string;
  source: string;
  position: number;
  updatedAt: Date;
  preview?:string
}
