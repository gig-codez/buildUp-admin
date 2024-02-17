export interface Suppliers {
    _id: string;
    business_name: string;
    business_email_address: string;
    password: string;
    TIN: string;
    business_tel: string;
    role: string;
    balance: string;
    supplier_deals: any[];
    supplier_type: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
