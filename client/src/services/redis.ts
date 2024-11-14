import { Redis } from "@upstash/redis";

export async function createRedisCustomer({
  customerId,
  cartId = "",
}: {
  customerId: string;
  cartId: string;
}) {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL,
    token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
  });

  try {
    const newRedisCustomer = await redis.set(customerId, {
      customerId: customerId,
      cartId: cartId,
    });
    return newRedisCustomer;
  } catch (error) {
    console.log(error);
  }
}

export async function getRedisCustomer(customerId: string) {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL,
    token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
  });

  try {
    var redisData = await redis.get(customerId);
    return redisData;
  } catch (error) {
    console.log("error fetching redis data", error);
  }
}
