import { render } from '@testing-library/angular';
import { UsuariosComponent } from './usuarios';

describe('UsuariosComponent', () => {
  it('should create', async () => {
    const component = await render(UsuariosComponent);
    expect(component).toBeTruthy();
  });
});
