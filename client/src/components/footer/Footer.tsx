import { BsGithub } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className="w-full bg-black">
      <ul className="text-white flex flex-row justify-evenly pb-10">
        <li></li>
        <li>
          <a
            className="flex flex-row  space-x-3  items-center"
            href="https://github.com/AdamuAbba/mempool-explorer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-xl">Source Code </p>
            <BsGithub size={19} />
          </a>
        </li>
        <li>
          <p className="text-4xl text-white">Mempool Explorer</p>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
