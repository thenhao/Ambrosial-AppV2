import {v4 as uuid} from 'uuid';
import './invoice.css';

export default function Invoice() {
    

return (
    <p className='invoice-number'><strong>Invoice number:<br/></strong>&nbsp;{uuid()}</p>
)
}
