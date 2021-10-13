import bookRoutes from '@/services/book/book.routes';
import pingRoutes from '@/services/ping/ping.routes';
import userRoutes from '@/services/user/user.routes';

export default [...pingRoutes, ...bookRoutes, ...userRoutes];
