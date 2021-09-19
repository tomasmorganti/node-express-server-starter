import pingRoutes from '@/services/ping/ping.routes';
import bookRoutes from '@/services/book/book.routes';

export default [...pingRoutes, ...bookRoutes];
