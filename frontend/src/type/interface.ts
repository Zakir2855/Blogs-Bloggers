export interface user {
  first_name: string;
  last_name: string;
  about: string;
  email: string;
  password: string;
  username: string;
  dob: string;
  
}
export interface login{
  email:string;
  password:string
}
interface Article {
  _id: string;
  article_image_url:string;
  article_title: string;
  article_description: string;
  user: any;
  likes?: any[];
  comments?: any[]; 
}

export type ArticlesResponse = Article[]; 
