export interface Representative {
    name: string;
    image: string;
}


export interface Country {
    code: string;
    name: string;
  }
  
export interface Customer {
    id: number | null;
    username: string;
    firstName: string;
    lastName: string;
    email: Date;
    password: string
}