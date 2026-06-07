/* Module Nhân viên — vcard */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Button, Badge, Avatar, AmountDisplay, StatusPill } = DS;
  const { Modal, Alert, VCardGrid, VCard, VCardHead, VCardRows, VCardField, VCardActions, EmptyState } = window.LuaShared;
  const { fmtMoney, SALARY_TYPE_LABEL, STATUS_LABEL, canWrite } = window.LuaUtils;
  const api = window.LuaAPI;

  const EMPTY = { code: '', name: '', phone: '', position: '', salary_type: 'monthly', base_salary: 0, start_date: '', status: 'active', notes: '' };

  function EmployeeForm({ initial, onSave, onCancel, error }) {
    const [f, setF] = React.useState(initial || EMPTY);
    const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
    return (
      <form className="lw-form" onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
        {error && <div className="lw-form__err">{error}</div>}
        <label>Mã nhân viên *<input value={f.code} onChange={(e) => set('code', e.target.value)} required /></label>
        <label>Họ tên *<input value={f.name} onChange={(e) => set('name', e.target.value)} required /></label>
        <label>Số điện thoại<input value={f.phone} onChange={(e) => set('phone', e.target.value)} /></label>
        <label>Chức vụ<input value={f.position} onChange={(e) => set('position', e.target.value)} /></label>
        <label>Loại lương
          <select value={f.salary_type} onChange={(e) => set('salary_type', e.target.value)}>
            <option value="monthly">Lương tháng</option>
            <option value="daily">Lương ngày</option>
            <option value="hourly">Lương giờ</option>
          </select>
        </label>
        <label>Lương cơ bản<input type="number" min="0" value={f.base_salary} onChange={(e) => set('base_salary', Number(e.target.value))} /></label>
        <label>Ngày bắt đầu<input type="date" value={f.start_date || ''} onChange={(e) => set('start_date', e.target.value)} /></label>
        <label>Trạng thái
          <select value={f.status} onChange={(e) => set('status', e.target.value)}>
            <option value="active">Đang làm</option>
            <option value="inactive">Nghỉ việc</option>
          </select>
        </label>
        <label>Ghi chú<textarea value={f.notes} onChange={(e) => set('notes', e.target.value)} /></label>
        <div className="lw-form__actions">
          <Button variant="secondary" onClick={onCancel}>Hủy</Button>
          <Button variant="primary" type="submit">Lưu</Button>
        </div>
      </form>
    );
  }

  function EmployeesScreen({ user }) {
    const [list, setList] = React.useState([]);
    const [q, setQ] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [modal, setModal] = React.useState(null);
    const [detail, setDetail] = React.useState(null);
    const [err, setErr] = React.useState('');
    const write = canWrite(user?.role, 'employees');

    const load = React.useCallback(() => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (status) params.set('status', status);
      api.get(`/employees?${params}`).then(setList).catch((e) => setErr(e.message));
    }, [q, status]);

    React.useEffect(() => { load(); }, [load]);

    const save = async (f) => {
      try {
        if (modal?.id) await api.put(`/employees/${modal.id}`, f);
        else await api.post('/employees', f);
        setModal(null); setErr(''); load();
      } catch (e) { setErr(e.message); }
    };

    const remove = async (id) => {
      if (!confirm('Xóa mềm nhân viên này?')) return;
      await api.del(`/employees/${id}`);
      load();
    };

    const showDetail = async (id) => {
      const h = await api.get(`/employees/${id}/history`);
      setDetail(h);
    };

    return (
      <div>
        <div className="lw-pagehead">
          <div className="lw-filters">
            <input placeholder="Tìm tên, mã, SĐT…" value={q} onChange={(e) => setQ(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Tất cả trạng thái</option>
              <option value="active">Đang làm</option>
              <option value="inactive">Nghỉ việc</option>
            </select>
          </div>
          {write && <Button variant="primary" icon="plus" onClick={() => { setModal({}); setErr(''); }}>Thêm nhân viên</Button>}
        </div>
        {err && !modal && <Alert type="err">{err}</Alert>}

        {!list.length ? <EmptyState>Chưa có nhân viên</EmptyState> : (
          <VCardGrid>
            {list.map((e) => (
              <VCard key={e.id}>
                <VCardHead
                  avatar={<Avatar name={e.name} size="md" />}
                  title={e.name}
                  subtitle={e.code}
                  end={<Badge tone={e.status === 'active' ? 'success' : 'neutral'}>{STATUS_LABEL[e.status]}</Badge>}
                />
                <VCardRows>
                  <VCardField label="Chức vụ" value={e.position || '—'} full />
                  <VCardField label="Loại lương" value={SALARY_TYPE_LABEL[e.salary_type]} />
                  <VCardField label="Lương cơ bản"><AmountDisplay value={e.base_salary} size="sm" showCurrency={false} /></VCardField>
                  {e.phone && <VCardField label="SĐT" value={e.phone} tone="mono" full />}
                </VCardRows>
                <VCardActions>
                  <Button size="sm" variant="secondary" onClick={() => showDetail(e.id)}>Chi tiết</Button>
                  {write && <>
                    <Button size="sm" variant="ghost" onClick={() => { setModal(e); setErr(''); }}>Sửa</Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(e.id)}>Xóa</Button>
                  </>}
                </VCardActions>
              </VCard>
            ))}
          </VCardGrid>
        )}

        {modal && (
          <Modal title={modal.id ? 'Sửa nhân viên' : 'Thêm nhân viên'} onClose={() => setModal(null)}>
            <EmployeeForm initial={modal.id ? modal : EMPTY} onSave={save} onCancel={() => setModal(null)} error={err} />
          </Modal>
        )}

        {detail && (
          <Modal title={`Lịch sử — ${detail.employee.name}`} onClose={() => setDetail(null)}>
            <p><strong>Lương đã chốt:</strong> {detail.payrolls.length} kỳ</p>
            {detail.payrolls.slice(0, 5).map((p) => (
              <div key={p.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                T{p.month}/{p.year}: {fmtMoney(p.net_salary)} ₫ — <StatusPill status={p.status === 'paid' ? 'paid' : p.status === 'locked' ? 'approved' : 'draft'} />
              </div>
            ))}
            <p style={{ marginTop: 16 }}><strong>Ứng lương gần đây:</strong> {detail.advances.length}</p>
            <p><strong>Ngày nghỉ:</strong> {detail.leaves.length}</p>
            <Button variant="secondary" onClick={() => setDetail(null)}>Đóng</Button>
          </Modal>
        )}
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { EmployeesScreen });
})();
