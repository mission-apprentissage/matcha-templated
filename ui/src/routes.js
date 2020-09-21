import { Homepage, First, Final, NotLooking, End } from './pages'
import { StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix } from './pages/Steps'

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
    component: StepOne,
    path: '/step-one',
  },
  {
    component: StepTwo,
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
