import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors()) //habilita que qualquer pagina acesse a API


app.post('/usuarios', async (req, res) => {
    console.log(req.body)
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) //deu certo e criou usuario
})

app.put('/usuarios/:id', async (req, res) => {
    console.log(req.body)
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body) //deu certo e criou usuario
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'usuario deletado com sucesso'})
})

app.get('/usuarios', async (req, res) => {

    //res.send('Ok, deu bom!')

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        }) 
    }else {
        users = await prisma.user.findMany()
    }

    res.send(users)
    res.status(200).json(users)
})

app.listen(3000)