import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'Zero Hustle Online Hotel Reservation Web Application',
  description:
    'Pick a vibe and explore the top destinations. Find & Connect: Book hotels and contact owners for a personalized stay.',
  keywords: 'hotels, find hotels, hotel booking, hotel reservations',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};
export default MainLayout;
