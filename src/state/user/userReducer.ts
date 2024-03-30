import { createSlice } from '@reduxjs/toolkit';
import User from '../../config/constants/models/user';
import { UserState } from '../../config/constants/types';
import { jsonToUser, parseJwt } from '../../utils';
import { toastHttpError } from '../../utils/httpHelper';
import { getUserDetails, signUp, resendVerificationMail, accountSetup, getIndividualProfile, getSuggestedUsers } from './userActions';

const jwtToken = localStorage.getItem('jwtToken')
  ? localStorage.getItem('jwtToken')
  : null;

let precachedUser = null;
if (jwtToken) {
  const accountPrincipal = localStorage.getItem('accountPrincipal')
    ? localStorage.getItem('accountPrincipal')
    : null;
  if (accountPrincipal) {
    precachedUser = jsonToUser({ account_principal: accountPrincipal, id: parseJwt(jwtToken)['id'] });
  }
}

const initialState: UserState = {
  userInfo: precachedUser,
  suggestedUsers: {
    users: [],
    pagination: {
      nextCursor: '',
      currentCursor: '',
      reachMaxLimit: false
    }
  },
  jwtToken,
  currentProfile: null,
  errorLoadingProfile: false,
  loading: false,
  success: false,
  signUpSuccess: false,
  verifySuccess: false,
  accountSetupSuccess: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('accountPrincipal')
      state.userInfo = null;
      state.jwtToken = null;
    },
    setCurrentUser: (state, action) => {
      state.currentProfile = action.payload;
    },
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("accountPrincipal", state.userInfo.accountPrincipal);
    },
    updateProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    changeSuggestedPage(state) {
      if (!state.suggestedUsers.pagination.nextCursor) return;
      state.suggestedUsers.pagination.currentCursor = state.suggestedUsers.pagination.nextCursor;
    },
    removeSuggestedUser(state, action) {
      const indexOfUser = state.suggestedUsers.users.findIndex(user => user.id === action.payload);
      state.suggestedUsers.users.splice(indexOfUser, 1);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      localStorage.setItem("accountPrincipal", state.userInfo.accountPrincipal);
    });

    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      toastHttpError(action.payload);
    });

    builder.addCase(getIndividualProfile.fulfilled, (state, action) => {
      state.errorLoadingProfile = false;
      state.currentProfile = action.payload;
    });

    builder.addCase(getIndividualProfile.rejected, (state, action) => {
      state.errorLoadingProfile = true;
      // toastHttpError(action.payload);
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.signUpSuccess = true;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      toastHttpError(action.payload);
    });

    builder.addCase(resendVerificationMail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(resendVerificationMail.fulfilled, (state, action) => {
      state.loading = false;
      state.verifySuccess = true;
    });

    builder.addCase(resendVerificationMail.rejected, (state, action) => {
      state.loading = false;
      toastHttpError(action.payload);
    });

    builder.addCase(accountSetup.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(accountSetup.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.accountSetupSuccess = true;
    });

    builder.addCase(accountSetup.rejected, (state, action) => {
      state.loading = false;
      state.accountSetupSuccess = false;
      toastHttpError(action.payload);
    });

    builder.addCase(getSuggestedUsers.fulfilled, (state, action) => {
      if (state.suggestedUsers.pagination.currentCursor !== state.suggestedUsers.pagination.nextCursor) return;

      const users: User[] = action.payload.results.map((res: any) => {
        const user = new User({});
        user.fromJson(res);
        return user;
      })
      if (!users.length) {
        state.suggestedUsers.pagination.reachMaxLimit = true;
        return;
      }
      state.suggestedUsers.users = [...state.suggestedUsers.users, ...users];
      state.suggestedUsers.pagination.nextCursor = action.payload.next_cursor;
    });
  }
});

export const { logout, login, updateProfile, changeSuggestedPage, removeSuggestedUser } = userSlice.actions
export default userSlice.reducer