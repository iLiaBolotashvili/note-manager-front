import { Footer } from 'flowbite-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaGitlab} from 'react-icons/fa'

const FooterBase = () => {
    return (
        <div className="w-full">
            <div className="w-full mt-32">
                <div className="mt-4 flex space-x-6 justify-center">
                <Footer.Icon
                    target="_blank"
                    href="https://www.linkedin.com/in/ilia-bolotashvili-968884228/"
                    icon={BsLinkedin}
                />
                <Footer.Icon
                    target="_blank"
                    href="https://github.com/iLiaBolotashvili"
                    icon={BsGithub}
                />
                <Footer.Icon
                    target="_blank"
                    href="https://git.nubes.ge/ilia"
                    icon={FaGitlab}
                />
                </div>
            </div>
        </div>
    );
};

export default FooterBase;