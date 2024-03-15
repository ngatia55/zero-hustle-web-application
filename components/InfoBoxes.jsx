import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='For Guests'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Browse Hotels',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            Pick a vibe and explore the top destinations. Find & Connect: Book
            hotels and contact owners for a personalized stay.
          </InfoBox>
          <InfoBox
            heading='For Hotel Owners'
            backgroundColor='bg-blue-100'
            buttonInfo={{
              text: 'Add Hotel',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500',
            }}
          >
            Reach new guests & offer flexible stays: List your hotel today.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
