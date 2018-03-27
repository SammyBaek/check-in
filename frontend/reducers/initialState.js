import { CHECK_CHECKIN, CHECK_CODE, JOIN_FIND, LOAD } from '../helpers/Enums';

export const authInitial = {
  user: null,
  userType: null
};

export const guestInitial = {
  events: LOAD.NOTHING,
  joinFind: JOIN_FIND.NOTHING_TO_CHECK,
  eventToJoin: { name: 'erger', code: 'fwwfe' },
  checkCode: CHECK_CHECKIN.NOTHING_TO_CHECK
};

export const hostInitial = {
  events: LOAD.NOTHING,
  checkCode: CHECK_CODE.NOTHING_TO_CHECK
};

export const eventInitial = {
  selected: {},
  selectedRsvps: LOAD.NOTHING,
  selectedAttends: LOAD.NOTHING,
  guests: LOAD.NOTHING
};

export const openInitial = {
  event: LOAD.NOTHING,
  selectedRsvps: LOAD.NOTHING
};
