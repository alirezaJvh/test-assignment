import Image from 'next/image'
import { Button } from './ui/Button'
import { TextField } from './ui/TextField'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  return (<div>
    salam
    <Button>by</Button>
    {/* <TextField placeholder='slaam' /> */}
    <div className='flex'>
      <div>
        by
      </div>
      <div>ss</div>
      <Calendar />
    </div>
  </div>)
}
