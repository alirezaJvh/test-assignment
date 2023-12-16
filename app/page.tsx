import Image from 'next/image'
import { Button } from './ui/Button'
import { TextField } from './ui/TextFiled'

export default function Home() {
  return (<div>
    salam
    <Button>by</Button>
    <TextField placeholder='slaam' />
    <div className='flex'>
      <div>
        by
      </div>
      <div>ss</div>
    </div>
  </div>)
}
