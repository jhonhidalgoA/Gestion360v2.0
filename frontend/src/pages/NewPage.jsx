import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/ui/Banner/Banner";
import NewPrevious from "@/components/home/NewPrevious";
import { bannerData } from "@/data/bannerData";
import "./NewPage.css"

const NewPage = () => {
  return (
    <>
      <Navbar />
      <Banner {...bannerData.noticias} />
      <div className="container-newPage">
        <NewPrevious
          cardsToShow={6}
          showMoreButton={false}
        />
      </div>
    </>
  );
};

export default NewPage;