import mongoose from 'mongoose';
import {Clientes} from './db';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { promises } from 'fs';

export const resolvers={
        Query:{
            getClientes: (root,{limite})=>{
                return Clientes.find({}).limit(limite);
            },
            getCliente : (root,{id})=>{
                return new Promise((resolve, object)=>{
                    Clientes.findById(id,(err,cliente)=>{
                        if(err) rejects(err)
                        else resolve(cliente)
                    });
                });
            }
        },
        Mutation:{
            crearCliente : (root,{input})=>{
                const nuevoCliente = new  Clientes({
                    nombre: input.nombre,
                    apellido: input.apellido,
                    empresa: input.empresa,
                    emails: input.emails,
                    edad: input.edad,
                    tipo: input.tipo
                });
                nuevoCliente.id =  nuevoCliente._id;

                return new Promise((resolve,object)=>{
                    nuevoCliente.save((error)=>{
                    if(error) rejects(error)
                    else resolve(nuevoCliente)
                    })               
                });
            },
            actualizarCliente:(root,{input})=>{
                return new  Promise((resolve,object)=>{
                    Clientes.findOneAndUpdate({_id:input.id},input,{new: true},(error,cliente)=>{
                        if(error) reject(error)
                        else resolve(cliente)
                    });
                });
            }
        }
}


 