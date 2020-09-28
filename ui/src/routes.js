import { Homepage, First, Final, NotLooking, End } from './pages'
import { StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix, StepOneNC, StepTwoNC } from './pages/Steps'

export default [
  {
    component: Homepage,
    path: '/',
  },
  {
    component: First,
    path: '/first',
  },
  {
    component: Final,
    path: '/final',
  },
  {
    component: NotLooking,
    path: '/autres',
  },
  {
    component: End,
    path: '/au-revoir',
  },
  {
    component: StepOneNC,
    path: '/step-one',
  },
  {
    component: StepTwoNC,
    path: '/step-two',
  },
  {
    component: StepThree,
    path: '/step-three',
  },
  {
    component: StepFour,
    path: '/step-four',
  },
  {
    component: StepFive,
    path: '/step-five',
  },
  {
    component: StepSix,
    path: '/step-six',
  },
]
