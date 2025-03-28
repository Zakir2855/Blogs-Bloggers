export interface user {
  first_name: string;
  last_name: string;
  about: string;
  email: string;
  password: string;
  username: string;
  dob: string;
  phoneNumber: string;
  communication_address: {
    address_1: string;
    address_2: string;
    country: "INDIA" | "US" | "AUSTRALIA";
    phone_number_country_code: string;
    state: string;
  };
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

export type ArticlesResponse = Article[]; // checks array of Article objects
