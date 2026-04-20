/*
 * Review Dot — minimal Obsidian plugin
 *
 * Two responsibilities:
 *   1. Tag File Explorer items with `data-review="fresh|stale|ok"` based on
 *      frontmatter dates. The CSS snippet `.obsidian/snippets/draft-indicator.css`
 *      does the actual dot rendering.
 *   2. Provide a "Mark reviewed" command (default hotkey Cmd/Ctrl+Shift+R)
 *      that stamps `last_reviewed: <today>` on the active file's frontmatter
 *      in-place. The metadataCache 'changed' listener then re-computes and the
 *      blue/yellow dot disappears without a manual edit.
 *
 * States:
 *   - `fresh` (blue dot): last_reviewed is null/absent → never human-reviewed
 *   - `stale` (yellow dot): last_reviewed < last_updated → reviewed once, content has since changed
 *   - `ok`   (no dot): last_reviewed >= last_updated → fully reviewed and current
 *   - no attribute: file lacks `last_reviewed` field entirely (legacy / template / etc.)
 *
 * Design note — why hotkey, not scroll-to-bottom:
 *   A scroll-triggered auto-review weakens the review semantic from "human
 *   verified the content" to "human's eyes passed over the DOM". Short pages
 *   (below viewport) would also never scroll, so the trigger would be either
 *   dead or instant depending on page length. A hotkey keeps review intentional
 *   and costs the same one keystroke.
 *
 * Why not Supercharged Links:
 *   SL manages arbitrary frontmatter → DOM attribute → color/icon/tooltip pipeline.
 *   We only need one field → one attribute → one dot, plus a scoped hotkey to
 *   flip that field. Self-built is tighter.
 *
 * Dates are compared as strings (YYYY-MM-DD sorts lexicographically).
 */

const { Plugin, TFile, Notice } = require('obsidian');

module.exports = class ReviewDotPlugin extends Plugin {
  async onload() {
    this.app.workspace.onLayoutReady(() => this.refreshAll());
    this.registerEvent(this.app.metadataCache.on('changed', (file) => this.updateFile(file)));
    this.registerEvent(this.app.workspace.on('layout-change', () => this.refreshAll()));
    this.registerEvent(this.app.vault.on('rename', (file) => this.updateFile(file)));

    this.addCommand({
      id: 'mark-reviewed',
      name: 'Mark current file as reviewed (stamp last_reviewed = today)',
      callback: () => this.markReviewed(),
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'R' }],
    });
  }

  onunload() {
    document
      .querySelectorAll('.nav-file-title[data-review]')
      .forEach((el) => el.removeAttribute('data-review'));
  }

  computeState(file) {
    const cache = this.app.metadataCache.getFileCache(file);
    const fm = cache && cache.frontmatter;
    if (!fm) return null;
    if (!('last_reviewed' in fm)) return null;
    const reviewed = fm.last_reviewed;
    if (reviewed === null || reviewed === undefined || reviewed === '') return 'fresh';
    const updated = fm.last_updated;
    if (!updated) return 'ok';
    return String(reviewed) < String(updated) ? 'stale' : 'ok';
  }

  findEl(path) {
    const fe = this.app.workspace.getLeavesOfType('file-explorer')[0];
    const view = fe && fe.view;
    const item = view && view.fileItems && view.fileItems[path];
    if (item && item.selfEl) return item.selfEl;
    for (const el of document.querySelectorAll('.nav-file-title')) {
      const p = (el.dataset && el.dataset.path) || el.getAttribute('data-path');
      if (p === path) return el;
    }
    return null;
  }

  updateFile(file) {
    if (!(file instanceof TFile) || file.extension !== 'md') return;
    const el = this.findEl(file.path);
    if (!el) return;
    const state = this.computeState(file);
    if (state) el.setAttribute('data-review', state);
    else el.removeAttribute('data-review');
  }

  refreshAll() {
    this.app.vault.getMarkdownFiles().forEach((f) => this.updateFile(f));
  }

  todayLocal() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  async markReviewed() {
    const file = this.app.workspace.getActiveFile();
    if (!file || file.extension !== 'md') {
      new Notice('Review Dot: no active markdown file');
      return;
    }
    const cache = this.app.metadataCache.getFileCache(file);
    const fm = cache && cache.frontmatter;
    if (!fm || !('last_reviewed' in fm)) {
      new Notice(`Review Dot: "${file.basename}" has no last_reviewed field — skipped`);
      return;
    }
    const today = this.todayLocal();
    await this.app.fileManager.processFrontMatter(file, (front) => {
      front.last_reviewed = today;
    });
    new Notice(`Review Dot: marked "${file.basename}" reviewed on ${today}`);
  }
};
