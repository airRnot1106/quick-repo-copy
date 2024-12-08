import type { ContentScriptContext } from 'wxt/client';
import { RepositoryCopyButton } from '@/components/domain/repository/atoms/RepositoryCopyButton';
import '@/reset.css';
import ReactDOM from 'react-dom/client';

const defineUi = async (ctx: ContentScriptContext) => {
  return await createShadowRootUi(ctx, {
    name: 'wxt-react-example',
    position: 'inline',
    anchor:
      '#repository-container-header > div.d-flex.flex-nowrap.flex-justify-end.mb-3.px-3.px-lg-5 > div.flex-auto.min-width-0.width-fit > div',
    append: 'last',
    onMount: (container) => {
      const wrapper = document.createElement('span');
      container.append(wrapper);

      const root = ReactDOM.createRoot(wrapper);
      root.render(<RepositoryCopyButton />);
      return { root, wrapper };
    },
    onRemove: (elements) => {
      elements?.root.unmount();
      elements?.wrapper.remove();
    },
  });
};

const isRepositoryPage = (url: string) => {
  const pattern = /^https:\/\/github\.com\/([^/]+)\/([^/]+)(\/.*)?$/;
  const match = url.match(pattern);
  return match !== null;
};

const mountUi = async (ctx: ContentScriptContext) => {
  const ui = await defineUi(ctx);

  if (!isRepositoryPage(window.location.toString())) {
    return;
  }

  // Mount initially
  ui.mount();
};

export default defineContentScript({
  matches: ['*://github.com/*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    await mountUi(ctx);

    // Re-mount when page changes
    ctx.addEventListener(window, 'wxt:locationchange', async ({ oldUrl }) => {
      if (isRepositoryPage(oldUrl.toString())) {
        return;
      }
      await mountUi(ctx);
    });
  },
});
