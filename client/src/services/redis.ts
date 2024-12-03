import { Redis } from "@upstash/redis";

export async function setRedisCustomer({
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
export type RedisObject = {
  cartId: string;
  customerId: string;
};

export async function getRedisCustomer(
  customerId: string
): Promise<RedisObject | null> {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL,
    token: process.env.NEXT_PUBLIC_REDIS_TOKEN,
  });

  try {
    const redisData: RedisObject | null = await redis.get(customerId);
    return redisData;
  } catch (error) {
    console.log("error fetching redis data", error);
  }
  return null;
}
