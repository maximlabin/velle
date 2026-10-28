// "Поделиться" block from the recipe and blog templates (both icons lead to VK there).
export default function Share() {
  return (
    <>
      <p className="share">Поделиться в социальных сетях:</p>
      <div className="d-flex align-items-center">
        <div className="social-icon">
          <a href="https://vk.com/myvelle"><img src="/wp-content/themes/velle/images/vk-icon.svg" alt="social" /></a>
        </div>
        <div className="social-icon">
          <a href="https://vk.com/myvelle"><img src="/wp-content/themes/velle/images/dzen-icon.svg" alt="social" /></a>
        </div>
      </div>
    </>
  );
}
