
import redis

r = redis.Redis(
  host='redis-11847.c56.east-us.azure.redns.redis-cloud.com',
  port=11847,
  password='C2ND8qdWZstRhEuASTjiAp58m0R3bZJw')

r.set('foo', 'bar')
r.set('foo', 'bar2')
print("true")

result = r.get('foo')
print(result)