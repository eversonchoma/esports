import express, { request, response } from 'express'
import { PrismaClient } from '@prisma/client';

const app = express()
const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });

    return response.json(games);
})

app.post('/games/:id/ads', (request, response) => {
    const gameId = request.params.id;
    return response.status(201).json(gameId);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            yearsPlaying: true,
            useVoiceChannel: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return response.json(ads.map((ad) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',')
        }
    }));
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            dicord: true
        },
        where:{
            id: adId
        }
    })
    return response.json({discord: ad.dicord});
})

app.listen(3333)
