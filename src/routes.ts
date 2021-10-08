import pingRoutes from '@/modules/ping/ping.routes';
import bookRoutes from '@/modules/book/book.routes';
import userRoutes from '@/modules/user/user.routes';

export default [...pingRoutes, ...bookRoutes, ...userRoutes];
