export interface Unit{
    id: number;
    name: string;
    programme: string;
    school: string;
    topic: string;
    url: string; 
    prereqs: String;//Unit[];
    tb: number;
}