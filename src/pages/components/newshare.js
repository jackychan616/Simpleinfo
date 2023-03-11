import {Group} from '@mantine/core';
import {FiShare2} from 'react-icons/fi';
import {AiFillSave,AiOutlineLike,AiOutlineDislike} from 'react-icons/ai';
export default function ButtonBox({children,url}) {
    return(
    <Group>
        <FiShare2/>
        <AiFillSave/>
        <AiOutlineLike/>
        <AiOutlineDislike/>
    </Group>
        
    );
}
