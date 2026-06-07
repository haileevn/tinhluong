/* Module Ngày nghỉ — vcard */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Button, Badge } = DS;
  const { Modal, PeriodPicker, usePeriod, VCardGrid, VCard, VCardHead, VCardRows, VCardField, EmptyState } = window.LuaShared;
  const { fmtDate, LEAVE_TYPE_LABEL, canWrite } = window.LuaUtils;
  const api = window.LuaAPI;

  function LeavesScreen({ user }) {
    const { year, month, setPeriod } = usePeriod();
    const [records, setRecords] = React.useState([]);
    const [summary, setSummary] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [modal, setModal] = React.useState(null);
    const [err, setErr] = React.useState('');
    const write = canWrite(user?.role, 'leaves');

    const load = React.useCallback(() => {
      Promise.all([
        api.get(`/leaves?year=${year}&month=${month}`),
        api.get(`/leaves/summary?year=${year}&month=${month}`),
        api.get('/employees?status=active'),
      ]).then(([r, s, e]) => { setRecords(r); setSummary(s); setEmployees(e); });
    }, [year, month]);

    React.useEffect(() => { load(); }, [load]);

    const save = async (f) => {
      try {
        if (modal?.id) await api.put(`/leaves/${modal.id}`, f);
        else await api.post('/leaves', f);
        setModal(null); setErr(''); load();
      } catch (e) { setErr(e.message); }
    };

    const activeSummary = summary.filter((s) => s.total_days > 0);

    return (
      <div>
        <div className="lw-pagehead">
          <PeriodPicker year={year} month={month} onChange={setPeriod} />
          {write && <Button variant="primary" icon="plus" onClick={() => { setModal({}); setErr(''); }}>Thêm ngày nghỉ</Button>}
        </div>

        <p className="lw-sectitle">Thống kê tháng {month}/{year}</p>
        {activeSummary.length ? (
          <VCardGrid>
            {activeSummary.map((s) => (
              <VCard key={s.employee_id}>
                <VCardHead title={s.name} subtitle={s.code} end={<Badge tone="info">{s.total_days} ngày</Badge>} />
                <VCardRows>
                  <VCardField label="Có phép" value={s.paid_days} tone="mono" />
                  <VCardField label="Không phép" value={s.unpaid_days} tone="neg" />
                  <VCardField label="Nghỉ ốm" value={s.sick_days} tone="mono" />
                  <VCardField label="Việc riêng" value={s.personal_days} tone="mono" />
                </VCardRows>
              </VCard>
            ))}
          </VCardGrid>
        ) : <EmptyState>Chưa có ngày nghỉ trong tháng</EmptyState>}

        <div style={{ height: 16 }} />
        <p className="lw-sectitle">Lịch sử nghỉ</p>
        {!records.length ? <EmptyState>Chưa có bản ghi</EmptyState> : (
          <VCardGrid>
            {records.map((r) => (
              <VCard key={r.id}>
                <VCardHead
                  title={r.employee_name}
                  subtitle={fmtDate(r.leave_date)}
                  end={<Badge tone={r.leave_type === 'unpaid' ? 'danger' : 'info'}>{LEAVE_TYPE_LABEL[r.leave_type]}</Badge>}
                />
                <VCardRows>
                  <VCardField label="Số ngày" value={r.days} tone="mono" />
                  {r.notes && <VCardField label="Ghi chú" value={r.notes} full />}
                </VCardRows>
              </VCard>
            ))}
          </VCardGrid>
        )}

        {modal && (
          <Modal title={modal.id ? 'Sửa ngày nghỉ' : 'Thêm ngày nghỉ'} onClose={() => setModal(null)}>
            <form className="lw-form" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              save({
                employee_id: Number(fd.get('employee_id')),
                leave_date: fd.get('leave_date'),
                leave_type: fd.get('leave_type'),
                days: Number(fd.get('days')),
                notes: fd.get('notes'),
              });
            }}>
              {err && <div className="lw-form__err">{err}</div>}
              {!modal.id && (
                <label>Nhân viên
                  <select name="employee_id" required>
                    {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                </label>
              )}
              <label>Ngày nghỉ<input type="date" name="leave_date" defaultValue={modal.leave_date || ''} required /></label>
              <label>Loại nghỉ
                <select name="leave_type" defaultValue={modal.leave_type || 'paid'}>
                  <option value="paid">Có phép</option>
                  <option value="unpaid">Không phép</option>
                  <option value="sick">Nghỉ bệnh</option>
                  <option value="personal">Việc riêng</option>
                </select>
              </label>
              <label>Số ngày<input type="number" step="0.5" min="0.5" name="days" defaultValue={modal.days ?? 1} required /></label>
              <label>Ghi chú<textarea name="notes" defaultValue={modal.notes || ''} /></label>
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

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { LeavesScreen });
})();
