import { Router, Request, Response, NextFunction, response } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utilities";

export const createVendor = async (req:Request, res:Response) => {
    const _posts = <CreateVendorInput>req.body;

    // Check for existing vendor by email
    const vendor = await Vendor.findOne({email: _posts.email});
    if(vendor !== null){
        return res.json({message: "A vendor is exist with this email address"});
    }

    //encryp password
    const salt:string = await GenerateSalt();
    const password:string = await GeneratePassword(_posts.password, salt);

    const createVendor = await Vendor.create({..._posts, password: password, salt: salt, rating: 0, serviceAvailabe: false, coverImages: []});

    res.json(createVendor);
}

export const getVendors = (req: Request, res:Response) => {
    Vendor.find().then(rows => res.json(rows)).catch(err => res.json({status:"error", message: err.message, code: err.code}));
};

export const getVendorById = (req: Request, res:Response) => {

};
