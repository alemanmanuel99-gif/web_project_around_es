type RendererFunction<T> = (item: T) => void;

class Section<T> {
  private _container: HTMLElement;
  private _renderedItems: T[];
  private _renderer: RendererFunction<T>;

  constructor(
    { data, renderer }: { data: T[], renderer: RendererFunction<T> }, containerSelector: string
  ) {
    this._container = document.querySelector(containerSelector) as HTMLElement;
    this._renderedItems = data;
    this._renderer = renderer;
  }

  renderItems(): void {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}
