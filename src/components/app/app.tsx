import { DATA } from '../../const';
import MainPage from '../../pages/main/main-page';

function App(): JSX.Element {
  return (
    <MainPage dataOffers = {DATA} />
  );
}

export default App;