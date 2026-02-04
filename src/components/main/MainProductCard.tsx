import { Link } from 'react-router-dom';
import Button from '../atom/Button';

export interface MainProductCardProps {
  cookieId: number;
  cookieName: string;
  imageUrl: string;
  description: string;
  isReversed: boolean;
}

const MainProductCard = ({
  cookieId,
  cookieName,
  imageUrl,
  description,
  isReversed,
}: MainProductCardProps) => {
  const reverse = isReversed ? 'md:flex-row-reverse' : 'md:flex-row';

  return (
    <section className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        w-full
                        max-w-7xl
                        mx-auto
                        px-4
                        h-[500px]
        ">
            <div className={`
                flex
                ${reverse}
                w-full
                max-w-7xl
                mx-auto
                rounded-4xl
                items-center
                hover:bg-brand-primary
                cursor-pointer
                transition-colors
                duration-500
                h-[350px]
                group
            `}>{/** 색깔표시 */}
                <div className="relative w-[500px] h-[500px] shrink-0">
                    <img
                    src={imageUrl}
                    alt={cookieName}
                    className="absolute inset-0 object-fit scale-x-[-1]r"
                    />
                </div>
                <div className="flex
                                flex-col
                                gap-7
                                relative
                                mx-[50px]
                "> {/** 오른쪽 */}
                    <div>
                        <p className="text-6xl font-extrabold">{cookieName}</p>
                        <p className="text-lg pt-4">{description}</p>
                    </div>
                    <div className="flex
                                    flex-row
                                    text-m
                                    font-bold
                                    gap-5
                    ">                        
                        <Button className="px-8 py-2.5" 
                            onClick={() => {}} 
                            variant="outline">
                                Learn More
                        </Button>
                        <Button className="px-8 py-2.5 transition duration-500" 
                            onClick={()=>{}}>
                                Order Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
  );
};

export default MainProductCard;
