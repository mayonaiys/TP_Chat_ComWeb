import asyncio
import websockets

clients = []

async def clientHandler(websocket, path):
    clients.append(websocket)
    try:
        async for message in websocket:
            for client in clients:
                await client.send(message)
    finally:
        clients.remove(websocket)
        for client in clients:
                await client.send("Un utilisateur a quitté le tchat")


start_server = websockets.serve(clientHandler, "localhost", 12345)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
