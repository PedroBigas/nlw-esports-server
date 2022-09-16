import  express, { request }  from "express";
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import convertHourStringToMinutes from './utils/convert-hour-string-to-minutes'
import convertMinutosToHourString from './utils/convert-minutes-to-hour'

const app = express()
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors())

/**
 * 
 *  Query: ...
 *  Route: ...
 *  Body: ...
 * 
 */



// HTTP methods / API RESTful / HTTP Codes

// GET, POST , PUT, PATCH, DELETE


// async / await

app.get('/games', async (req,res) => {

    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.json(games);
});

app.post('/games/:id/ads', async (req,res) => {
    
    const gameId = req.params.id;

    const body = req.body;

    // Validação

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })
    
    return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req,res) => { 

    const gameId: any = req.params.id;

    const ads = await prisma.ad.findMany({
        
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
            
        },

        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        }

    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutosToHourString(ad.hourStart),
            hourEnd: convertMinutosToHourString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async (req,res) => { 

    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId,
        }
    })

    return res.json({
        discord: ad.discord ,
    })
})


app.listen(3000, () => {
    console.log("Server Running");
})

 
