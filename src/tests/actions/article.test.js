import moxios from 'moxios';
import configuration from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import Hashid from 'hashids';
// @load action
import getAllArticle, {
  createArticle, addTag, removeTag, singleArticle
} from '../../actions/article';
// getAllArticle,
const middleware = [ReduxThunk];
const mockStore = configuration(middleware);
const Store = mockStore();
const hashids = new Hashid();
// test begin
describe('Article', () => {
  beforeEach(() => {
    moxios.wait();
    Store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('Should get all article using GET_ALL_ARTICLE action', () => {
    Store.dispatch(getAllArticle());
    expect(getAllArticle()).toBeDefined();
    expect(getAllArticle().length).toBe(1);
    expect(Store.getActions()).toBeDefined();
  });
  it('should create article', async () => {
    const tag = ['laravel', 'igihe'].join(',');
    const form = new FormData();
    form.append('title', 'title');
    form.append('body', 'body');
    form.append('tag', tag);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          error: '',
          response: 'success'
        }
      });
    });
    return Store.dispatch(createArticle(form))
      .then(() => {
        expect(Store.getActions().length).toBe(2);
      });
  });
  it('should add tags using ADD_TAG action', () => {
    const data = 'programing';
    Store.dispatch(addTag(data));
    expect(Store.getActions()).toMatchSnapshot();
    expect(addTag(data).length).toBe(1);
  });
  it('Dispatches the correct action and payload', () => {
    Store.dispatch(removeTag('fish'));
    expect(Store.getActions()).toMatchSnapshot();
  });
  it('should test single article with action SINGLE_ARTICLE and paylod', () => {
    const id = hashids.encode(1);
    Store.dispatch(singleArticle(id));
    expect(Store.getActions()).toBeDefined();
  });
});
