/* Module Ứng lương — vcard */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Button, Avatar, AmountDisplay } = DS;
  const { Modal, PeriodPicker, usePeriod, VCardGrid, VCard, VCardHead, VCardRows, VCardField, VCardActions, EmptyState } = window.LuaShared;
  const { fmtDate, canWrite } = window.LuaUtils;
  const api = window.LuaAPI;

  function AdvancesScreen({ user }) {
    const { year, month, setPeriod } = usePeriod();
    const [records, setRecords] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [modal, setModal] = React.useState(null);
    const [warn, setWarn] = React.useState('');
    const [err, setErr] = React.useState('');
    const write = canWrite(user?.role, 'advances');

    const load = React.useCallback(() => {
      Promise.all([
        api.get(`/advances?year=${year}&month=${month}`),
        api.get('/employees?status=active'),
      ]).then(([r, e]) => { setRecords(r); setEmployees(e); });
    }, [year, month]);

    React.useEffect(() => { load(); }, [load]);

    const checkLimit = async (employee_id, amount) => {
      if (!employee_id || !amount) { setWarn(''); return; }
      try {
        const r = await api.get(`/advances/check-limit?employee_id=${employee_id}&amount=${amount}&year=${year}&month=${month}`);
        setWarn(r.warning || '');
      } catch { setWarn(''); }
    };

    const save = async (f) => {
      try {
        if (modal?.id) await api.put(`/advances/${modal.id}`, f);
        else await api.post('/advances', { ...f, approved_by: user?.name });
        setModal(null); setErr(''); setWarn(''); load();
      } catch (e) { setErr(e.message); }
    };

    const total = records.reduce((a, r) => a + r.amount, 0);

    return (
      <div>
        <div className="lw-pagehead">
          <PeriodPicker year={year} month={month} onChange={setPeriod} />
          {write && <Button variant="primary" icon="plus" onClick={() => { setModal({}); setErr(''); setWarn(''); }}>Thêm ứng lương</Button>}
        </div>
        <p className="lw-sectitle">Tổng ứng tháng: <AmountDisplay value={total} size="sm" /></p>

        {!records.length ? <EmptyState>Chưa có ứng lương trong tháng này</EmptyState> : (
          <VCardGrid>
            {records.map((a) => (
              <VCard key={a.id}>
                <VCardHead
                  avatar={<Avatar name={a.employee_name} size="md" />}
                  title={a.employee_name}
                  subtitle={fmtDate(a.advance_date)}
                  end={<AmountDisplay value={a.amount} size="md" tone="accent" />}
                />
                <VCardRows>
                  <VCardField label="Người duyệt" value={a.approved_by || '—'} />
                  <VCardField label="Ghi chú" value={a.notes || '—'} full />
                </VCardRows>
                {write && (
                  <VCardActions>
                    <Button size="sm" variant="ghost" onClick={() => api.del(`/advances/${a.id}`).then(load)}>Xóa</Button>
                  </VCardActions>
                )}
              </VCard>
            ))}
          </VCardGrid>
        )}

        {modal && (
          <Modal title="Thêm ứng lương" onClose={() => setModal(null)}>
            <form className="lw-form" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              save({
                employee_id: Number(fd.get('employee_id')),
                advance_date: fd.get('advance_date'),
                amount: Number(fd.get('amount')),
                notes: fd.get('notes'),
              });
            }}>
              {err && <div className="lw-form__err">{err}</div>}
              {warn && <div className="lw-form__warn">{warn}</div>}
              <label>Nhân viên
                <select name="employee_id" required onChange={(e) => {
                  const amt = document.querySelector('[name=amount]')?.value;
                  checkLimit(e.target.value, amt);
                }}>
                  {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </label>
              <label>Ngày ứng<input type="date" name="advance_date" required defaultValue={new Date().toISOString().slice(0, 10)} /></label>
              <label>Số tiền ứng (VNĐ)
                <input type="number" name="amount" min="1" required onChange={(e) => {
                  const emp = document.querySelector('[name=employee_id]')?.value;
                  checkLimit(emp, e.target.value);
                }} />
              </label>
              <label>Ghi chú<textarea name="notes" /></label>
              <div className="lw-form__actions">
                <Button variant="secondary" onClick={() => setModal(null)}>Hủy</Button>
                <Button variant="primary" type="submit">Lưu</Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { AdvancesScreen });
})();
