import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILesson, defaultValue } from 'app/shared/model/lesson.model';

export const ACTION_TYPES = {
  FETCH_LESSON_LIST: 'lesson/FETCH_LESSON_LIST',
  FETCH_LESSON: 'lesson/FETCH_LESSON',
  CREATE_LESSON: 'lesson/CREATE_LESSON',
  UPDATE_LESSON: 'lesson/UPDATE_LESSON',
  DELETE_LESSON: 'lesson/DELETE_LESSON',
  SET_BLOB: 'lesson/SET_BLOB',
  RESET: 'lesson/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILesson>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type LessonState = Readonly<typeof initialState>;

// Reducer

export default (state: LessonState = initialState, action): LessonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LESSON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LESSON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LESSON):
    case REQUEST(ACTION_TYPES.UPDATE_LESSON):
    case REQUEST(ACTION_TYPES.DELETE_LESSON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LESSON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LESSON):
    case FAILURE(ACTION_TYPES.CREATE_LESSON):
    case FAILURE(ACTION_TYPES.UPDATE_LESSON):
    case FAILURE(ACTION_TYPES.DELETE_LESSON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LESSON_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_LESSON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LESSON):
    case SUCCESS(ACTION_TYPES.UPDATE_LESSON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LESSON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/lessons';

// Actions

export const getEntities: ICrudGetAllAction<ILesson> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LESSON_LIST,
    payload: axios.get<ILesson>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ILesson> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LESSON,
    payload: axios.get<ILesson>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILesson> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LESSON,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ILesson> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LESSON,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILesson> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LESSON,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
